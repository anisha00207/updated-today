
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.css']
})
export class AcceptOrderComponent implements OnInit {
  pendingOrders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

 fetchOrders(): void {
  this.http.get('http://localhost:3000/api/orders/pending').subscribe({
    next: (response: any) => {
      console.log("API Response:", response); // ✅ Debugging Step
      this.pendingOrders = response;
    },
    error: (error) => {
      console.error("Error fetching orders:", error);
    }
  });
}


  acceptOrder(orderId: string): void {
  const requestBody = {}; // ✅ Body required, even if empty

  this.http.patch(`http://localhost:3000/api/orders/accept/${orderId}`, requestBody).subscribe({
    next: () => {
      alert("Order accepted & moved successfully!");
      this.fetchOrders(); // ✅ Refresh list
    },
    error: (error) => {
      console.error("Error accepting order:", error);
      alert("Failed to accept order!");
    }
  });
}

    
}
