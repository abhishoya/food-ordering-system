import React, { Component } from "react";
import {Card, CardText, CardTitle} from 'reactstrap';
import {Button} from "react-bootstrap";
import axios from 'axios';

function handleOrder(order)
{
  const ord = order.map((orda) => 
  {
      const x = [0].map(() => {return(<div key="-1">Order no. {order.indexOf(orda)}</div>)});
      const abc = orda.orders.map((dish)=> {
              return (
              <div key={dish.id} className="col-4 m-1">
                  <Card key={dish.id}>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>Quantity: {dish.qty}</CardText>
                  </Card>
              </div>
          )
      });
      const y= [0].map(() => {return(<div key="-2"><br></br></div>)});
      var bca = x.concat(abc);
      var xyz = bca.concat(y);
      return xyz;
  });
  return ord.reverse();
}

export default class Admin extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      username: "",
      password: "" ,
      token: ""
    };
  }

  componentDidMount()
  {
    this.fetchOrders();
    this.interval = setInterval(()=>this.fetchOrders(),5000);
  }
  
  componentWillUnmount()
  {
    clearInterval(this.interval);
  }

  fetchOrders()
  {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/order',{token:token})
    .then((res)=>{
      const data = handleOrder(res.data);
      this.setState({orders: data});
    })
    .catch((err)=>console.log(err));
  }

  

  render() {
    return (
        <div>
            <Button onClick={()=>this.fetchOrders()}>Refresh</Button>
            <br></br><br></br>
            <div>{this.state.orders}</div>
        </div>
    );
  }
}