import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {Component} from 'react';
import Rounds from './Rounds';
import {Form, Col, Row, Container, Button}  from 'react-bootstrap';

class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      totalRounds: [],
      info : {},
      round: {}
    }
  }


  componentDidMount() {
    this.getTotal();
  }

  getTotal(){
    fetch("http://localhost:8080/total")
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              info: result
            });          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



 

  render(){

  const play = (choice) => {

    var targetUrl ='http://localhost:8080/play/'+choice;
    const res= fetch(targetUrl,{
        method: 'GET',
        headers: {
                    'Content-Type': "application/json; charset=utf-8"
        }
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({round: result});
        totalRounds();
        this.getTotal();
      })
    .catch(error =>{
            console.log(error)
        });

  };

  const reset  = () => {
    var targetUrl ='http://localhost:8080/rounds/restart'
    const res= fetch(targetUrl,{
      method: 'GET',
        headers: {
                    'Content-Type': "application/json; charset=utf-8"
        }
    })
    .then(
      (result) => {
        totalRounds();
        this.getTotal();
      })
    .catch(error =>{
            console.log(error)
        });
  };
 
  const totalRounds = () => {

    var targetUrl ='http://localhost:8080/rounds'
    const res= fetch(targetUrl,{
      method: 'GET',
        headers: {
                    'Content-Type': "application/json; charset=utf-8"
        }
    })
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        this.setState({totalRounds: result});
        this.getTotal();
    })
    .catch(error =>{
            console.log(error)
        });

  };
  return (
    <Container fluid>
      <Row>
        <Col style={{textAlign: "center"}}>
          <h1>Rock-Paper-Scissors Game</h1>
        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: "center"}}>
        <h5>Wins: {this.state.info.wins}</h5>
        <h5>Draws: {this.state.info.draws}</h5>
        <h5>Losses: {this.state.info.losses}</h5>
        <h5>Total Rounds: {this.state.info.totalRounds}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
        {
          <div>
            <div style={{textAlign: "center"}}>
              {this.state.round.userWin == true && <h1>You Win! :)</h1>}
              {this.state.round.draw == true && <h1>Draw</h1>}
              {this.state.round.userWin == false && this.state.round.draw == false && <h1>You Lose! :(</h1>}
            </div>
            <Row className="justify-content-md-center">
              <Col style={{textAlign: "center", margin: "2px", padding: "15px", border: "2px solid black", borderRadius: "25px"}} xs lg="5">
                <h3>{ this.state.round.userChoice}</h3>
                <h3>Human</h3>
                <Row className="justify-content-md-center">
                  <Col  xs lg="2">
                    <Button  size="lg" onClick={() => play(0)}>Rock</Button>
                  </Col>
                  <Col  xs lg="2">
                    <Button  size="lg" onClick={() => play(1)}>Paper</Button>
                  </Col>
                  <Col  xs lg="2">
                    <Button  size="lg" onClick={() => play(2)}>Scissors</Button>
                  </Col>
                </Row>
              </Col>
              <Col style={{textAlign: "center", margin: "2px", padding: "15px", border: "2px solid black", borderRadius: "25px"}} xs lg="5">
                <h3>{this.state.round.computerChoice}</h3>
                <h3>Computer</h3>
              </Col>
            </Row>                
          </div>
          }
          
          <Row>
          <Button  size="lg"  onClick={() => reset()}>Restart</Button>
          </Row>
          <Rounds totalRounds={this.state.totalRounds}/>
        </Col>
      </Row>
{/*       
      <Row>
        <Col style={{textAlign: "center"}}>
          <h2>Baskets Available</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Baskets baskets={this.state.baskets}/>
        </Col>
      </Row>
      <Row>
        <Col style={{textAlign: "center"}}>
          <h2>Add Item to Basket</h2>
        </Col>
      </Row>
      <Form onSubmit={e => { e.preventDefault(); }}>
      <Form.Group>
      <Form.Label for="baskets">Choose a basket: </Form.Label>
      <Form.Control as="select" name="baskets" onChange={this.handleBasketSelectChange} id="baskets">
        {this.state.baskets.map((basket, index) => (
          <option value={index}>Basket no. {index+1}</option>
        ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label for="products">Choose a product: </Form.Label>
        <Form.Control as="select" onChange={this.handleProductSelectChange} name="products" id="products">
          <option value="1">Pen</option>
          <option value="2">Tshirt</option>
          <option value="3">Mug</option>
        </Form.Control>
      </Form.Group>
      <Button block variant="primary" onClick={this.addProduct}>Add Item</Button>
      </Form> */}
    </Container>
  );
}


}
export default App;
