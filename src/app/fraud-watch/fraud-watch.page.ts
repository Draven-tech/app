import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ssim } from 'ssim.js'; // ✅ Import from ssim.js

@Component({
  standalone: false,
  selector: 'app-fraud-watch',
  templateUrl: './fraud-watch.page.html',
  styleUrls: ['./fraud-watch.page.scss']
})
export class FraudWatchPage implements OnInit {
  currentImage: string | undefined;
  isLoading = false;

  constructor(
    private alertController: AlertController,
    private firestore: Firestore
  ) {}

  ngOnInit() {}

  async scanSeal() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      this.currentImage = image.dataUrl;
    } catch (error) {
      console.error('Camera error:', error);
      this.showAlert('Error', 'Failed to access camera');
    }
  }

  async checkForTampering() {
    if (!this.currentImage) {
      await this.showAlert('Error', 'Please scan an image first');
      return;
    }

    this.isLoading = true;

    try {
      const referenceImage = await this.loadReferenceImage();
      const similarity = await this.compareImages(this.currentImage, referenceImage);

      if (similarity < 0.85) {
        await this.showAlert('⚠️ Warning', `Tampering detected! Similarity: ${(similarity * 100).toFixed(1)}%`);
        await this.logToFirebase(similarity);
      } else {
        await this.showAlert('✅ Success', `No tampering found. Similarity: ${(similarity * 100).toFixed(1)}%`);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      await this.showAlert('🚨 Error', 'Analysis failed. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  private async compareImages(img1Src: string, img2Src: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const img1 = new Image();
      const img2 = new Image();
      let loaded = 0;

      const onLoad = () => {
        loaded++;
        if (loaded === 2) {
          try {
            const canvas1 = document.createElement('canvas');
            const canvas2 = document.createElement('canvas');

            canvas1.width = img1.width;
            canvas1.height = img1.height;
            canvas2.width = img2.width;
            canvas2.height = img2.height;

            const ctx1 = canvas1.getContext('2d')!;
            const ctx2 = canvas2.getContext('2d')!;

            ctx1.drawImage(img1, 0, 0);
            ctx2.drawImage(img2, 0, 0);

            const imgData1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
            const imgData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);

            const image1 = {
              data: imgData1.data,
              width: canvas1.width,
              height: canvas1.height
            };

            const image2 = {
              data: imgData2.data,
              width: canvas2.width,
              height: canvas2.height
            };

            const result = ssim(image1, image2); // ✅ Compare using ssim.js
            resolve(result.mssim); // ✅ Use mean SSIM
          } catch (err) {
            reject(err);
          }
        }
      };

      img1.onload = onLoad;
      img2.onload = onLoad;
      img1.onerror = () => reject(new Error('Failed to load image 1'));
      img2.onerror = () => reject(new Error('Failed to load image 2'));

      img1.src = img1Src;
      img2.src = img2Src;
    });
  }

  private async loadReferenceImage(): Promise<string> {
    return 'assets/images/good-seal.jpg';
  }

  private async logToFirebase(similarity: number) {
    try {
      const docRef = doc(this.firestore, 'tamperLogs', new Date().toISOString());
      await setDoc(docRef, {
        timestamp: new Date(),
        image: this.currentImage,
        similarity,
        status: 'tamper_suspected'
      });
    } catch (error) {
      console.error('Firebase error:', error);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
