import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurantName: string = '';
  mailId: string = '';
  showAddDishForm: boolean = false;
  newDish = {
    dishName: '',
    description: '',
    price: 0,
    cuisine: '',
    type: '',
    image: null // File
  };
  dishes: any[] = []; // List of dishes

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve restaurant info from localStorage
    this.restaurantName = localStorage.getItem('restaurantName') ?? '';
    this.mailId = localStorage.getItem('mailId') ?? '';

    // Fetch dishes for this restaurant
    this.fetchDishes();
  }

  // Toggle Add Dish Form
  toggleAddDishForm(): void {
    this.showAddDishForm = !this.showAddDishForm;
  }

  // Handle File Change for Image Upload
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newDish.image = file; // Save the file
    }
  }

  // Add Dish to the Backend
  addDish(): void {
  const formData = new FormData();
  formData.append('dishName', this.newDish.dishName);
  formData.append('description', this.newDish.description);
  formData.append('price', this.newDish.price.toString());
  formData.append('cuisine', this.newDish.cuisine); // Ensure this is included
  formData.append('type', this.newDish.type);
  if (this.newDish.image) {
    formData.append('image', this.newDish.image); // Add image file
  }
  formData.append('restaurantName', this.restaurantName);
  formData.append('mailId', this.mailId);

  this.http.post('http://localhost:3000/api/dishes', formData).subscribe({
    next: (response: any) => {
      alert('Dish added successfully!');
      this.fetchDishes(); // Refresh the dishes list
      this.resetForm();
    },
    error: (error) => {
      console.error('Error adding dish:', error);
      alert('Failed to add dish. Please try again.');
    }
  });
}

  // Fetch All Dishes for the Restaurant
  fetchDishes(): void {
    this.http
      .get(`http://localhost:3000/api/dishes?restaurantName=${this.restaurantName}&mailId=${this.mailId}`)
      .subscribe({
        next: (response: any) => {
          this.dishes = response.dishes; // Ensure 'image' is part of the response
        },
        error: (error) => {
          console.error('Error fetching dishes:', error);
        }
      });
  }

  // Reset Add Dish Form
  resetForm(): void {
    this.newDish = {
      dishName: '',
      description: '',
      price: 0,
      cuisine: '',
      type: '',
      image: null
    };
    this.showAddDishForm = false;
  }

  // Handle Logout
  onSignOut(): void {
    // Clear localStorage
    localStorage.removeItem('restaurantName');
    localStorage.removeItem('mailId');

    // Redirect to Sign-In Page
    this.router.navigate(['/restaurant-home']);
  }
}