import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'six-payment';

  constructor(
    private http: HttpClient
  ) {

  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json; charset=utf-8')
    headers.append('Accept', 'application/json')
  }

  makePayment() {
    let obj = {
      "RequestHeader": {
        "SpecVersion": "1.22",
        "CustomerId": "258308",
        "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b",
        "RetryIndicator": 0
      },
      "TerminalId": "17732700",
      "Payment": {
        "Amount": {
          "Value": "100",
          "CurrencyCode": "CHF"
        },
        "OrderId": "Id of the order",
        "Description": "Description of payment"
      },
      "ReturnUrls": {
        "Success": "http://localhost:4200/",
        "Fail": "http://localhost:4200/"
      }
    }
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    this.http.post('https://test.saferpay.com/api/Payment/v1/PaymentPage/Initialize', obj, {
      headers: headers
    }).subscribe(res => {
      console.log(res);
    })
  }

}
