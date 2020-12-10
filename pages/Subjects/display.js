import React, {Component} from 'react';
import Submission from '../../Ethereum/submission';
import {Link} from '../../routes';
import web3 from '../../Ethereum/web3';
import Layout from '../../Components/Layout';
import RequestRow from '../../Components/requestRow';
import {Table, Button} from 'semantic-ui-react';

class Submit extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = Submission(address);

        const requestCount = await campaign.methods.getCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element,index) => {
                return campaign.methods.listofsubmissions(index).call()
            }) 
        );

        return {address, requests, requestCount};
    }

    renderRow() {
        return this.props.requests.map((request, index) => {
            return ( <RequestRow 
                key={index}
                id={index}
                request = {request}
                address = {this.props.address}
            />
            );
        });
    }
    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
                <Link route={`/Subjects/${this.props.address}/upload`}>
                <Button 
                content = 'Upload'
                icon = "add"
                floated = "right"
                primary
                />
                </Link>
                <h3>Submission Status: </h3>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>Sno.</HeaderCell>
                            <HeaderCell>First Name</HeaderCell>
                            <HeaderCell>Last Name</HeaderCell>
                            <HeaderCell>Scholar Number</HeaderCell>
                            <HeaderCell>File Link</HeaderCell>
                            <HeaderCell>Submission Time</HeaderCell>

                        </Row>
                    </Header>


                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
            </Layout>
        )
    }
}

export default Submit;