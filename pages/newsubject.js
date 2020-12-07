import React,{Component} from 'react';
import web3 from '../Ethereum/web3';
import create from '../Ethereum/create';
import { render } from 'react-dom';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../Components/Layout';


class NewSubject extends Component{

    state = {
        subject: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async(event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await create.methods.createNewSubject(this.state.subject).send({
                from: accounts[0],
                gas: '1000000'
            });
        } catch (error) {
            this.setState({errorMessage: error.Message})
        }
        this.setState(({loading:false}));
    }


    render(){
        return(
            <Layout>
                <h3>Create a new Submission Link</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Subject</label>
                        <Input
                         value = {this.state.subject}
                         onChange = {event=> this.setState({subject: event.target.value})} 
                        />
                    </Form.Field>
                    <Message error header="Oops" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default NewSubject;