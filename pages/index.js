import React, {Component} from 'react';
import web3 from '../Ethereum/web3';
import create from '../Ethereum/create';
import {Card, Button} from 'semantic-ui-react';
import {Link} from '../routes';
import Layout from '../Components/Layout';

class Submission extends Component{
    static async getInitialProps() {
        const subjects = await create.methods.getDeployedContracts().call();
        //console.log(matches.length);
        return {subjects};
    }


    renderSubjects() {
        const item = this.props.subjects.map(address=> {
            return{
                header: address.name,
                description: (
                    <Link route={`/Subjects/${address.sender}`}>
                        <a>Submit</a>
                    </Link>
                ),
                meta: (`${address.sender}`),
                fluid: true
            };
        });
        return <Card.Group items={item}></Card.Group>
    }

    render(){
        return(
              <Layout>

              
            <div>

            {this.renderSubjects()}

            <Link route='/newsubject'>
            
            <a>    
            <Button 
                content = 'New Submission'
                icon = "add"
                floated = "right"
                primary
            />
            </a>
            </Link>
            </div>
            </Layout>
        );
    }
}


export default Submission;
