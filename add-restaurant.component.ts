/*import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  restaurant = {
    restaurantName: '',
    shopOwnerName: '',
    shopAddress: '',
    fssaiCode: '',
    aadharNumber: '',
    phoneNumber: '',
    bankAccountNumber: '',
    password: '',
    mailId: ''
  };

  constructor(private restaurantService: RestaurantService) {}

  addRestaurant(): void {
    this.restaurantService.addToDecision(this.restaurant).subscribe(
      (response) => {
        alert('Restaurant details stored successfully!'); // Show success alert
        this.clearForm(); // Clear the form after successful submission
      },
      (error) => {
        console.error('Error storing restaurant details:', error); // Log any errors
        alert('Failed to store restaurant details. Please try again.'); // Show error alert
      }
    );
  }
  

  clearForm(): void {
    // Reset the form fields
    this.restaurant = {
      restaurantName: '',
      shopOwnerName: '',
      shopAddress: '',
      fssaiCode: '',
      aadharNumber: '',
      phoneNumber: '',
      bankAccountNumber: '',
      password: '',
      mailId: ''
    };
  }
}
*/
import { Component } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  restaurant = {
    restaurantName: '',
    shopOwnerName: '',
    shopAddress: '',
    fssaiCode: '',
    aadharNumber: '',
    phoneNumber: '',
    bankAccountNumber: '',
    password: '',
    mailId: ''
  };

  confirmPassword: string = '';
  captcha!: string;
  userCaptcha: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.generateCaptcha(); // Generate Captcha on load
  }

  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  validateForm(): boolean {
    if (this.restaurant.restaurantName.length < 3) {
      alert('Restaurant Name must be at least 3 characters.');
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(this.restaurant.shopAddress)&& this.restaurant.shopOwnerName.length < 3) {
      alert('Shop Owner Name must be at least 3 characters and it should contain only characters');
      return false;
    }
    if (this.restaurant.shopAddress.length < 7) {
      alert('Shop Address must be at least 7 characters.');
      return false;
    }
    if (!/^\d{14}$/.test(this.restaurant.fssaiCode)) {
      alert('FSSAI Code must be exactly 14 digits.');
      return false;
    }
    if (!/^\d{12}$/.test(this.restaurant.aadharNumber)) {
      alert('Aadhar Number must be exactly 12 digits.');
      return false;
    }
    if (!/^[789]\d{9}$/.test(this.restaurant.phoneNumber)) {
      alert('Phone Number must start with 7, 8, or 9 and be 10 digits.');
      return false;
    }
    if (!/^\d{12}$/.test(this.restaurant.bankAccountNumber)) {
      alert('Bank Account Number must be exactly 12 digits.');
      return false;
    }
       if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.restaurant.password)) {
  alert('Password must be at least 8 characters long and include a capital letter, small letter, digit, and special character.');
  return false;
}

    
    if (this.restaurant.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(this.restaurant.mailId) || /\s/.test(this.restaurant.mailId)) {
  alert('Mail ID must be in the format text@gmail.com or text@yahoo.com and must not contain spaces.');
  return false;
}

    if (this.userCaptcha !== this.captcha) {
      alert('Invalid Captcha.');
      return false;
    }
    return true;
  }

  addRestaurant(): void {
    if (!this.validateForm()) return;

    this.restaurantService.addToDecision(this.restaurant).subscribe(
      () => {
        alert('Restaurant details stored successfully!, Wait till your details get approved ' );
        this.clearForm();
      },
      (error) => {
        console.error('Error storing restaurant details:', error);
        alert('Failed to store restaurant details. Please try again.');
      }
    );
  }
  isPasswordValid(): boolean {
  return this.restaurant.password.length >= 8 && 
         /[A-Z]/.test(this.restaurant.password) && 
         /[a-z]/.test(this.restaurant.password) && 
         /\d/.test(this.restaurant.password) && 
         /[@$!%*?&]/.test(this.restaurant.password);
}



  clearForm(): void {
    this.restaurant = {
      restaurantName: '',
      shopOwnerName: '',
      shopAddress: '',
      fssaiCode: '',
      aadharNumber: '',
      phoneNumber: '',
      bankAccountNumber: '',
      password: '',
      mailId: ''
    };
    this.confirmPassword = '';
    this.userCaptcha = '';
    this.generateCaptcha();
  }
}
