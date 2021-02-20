import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Rounds extends Component {
 
  render(){
        var totalRounds = this.props.totalRounds;
        return (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Choice</th>
                <th>Computer Choice</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {totalRounds.map((round) => (
                <tr>
                  <td>{round.userChoice}</td>
                  <td>{round.computerChoice}</td>
                  <td>
                    {round.userWin == true && <span>Win</span>}
                    {round.draw == true && <span>Draw</span>}
                    {round.userWin == false && round.draw == false && <span>Loss</span>}
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        );
  }
}
function delteRow(index){}
  export default Rounds;