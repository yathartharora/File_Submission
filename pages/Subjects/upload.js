import React, {Component} from 'react';
import Submission from '../../Ethereum/submission';
import {Link} from '../../routes';
import web3 from '../../Ethereum/web3';
import Layout from '../../Components/Layout';
import ipfs from '../../ipfs';
import { Form, Input, Button } from 'semantic-ui-react';

class Upload extends Component{


    static async getInitialProps(props){
        const {address} = props.query;
        
        return {address};
    };

    constructor(){
        super();
        this.state = {
            loading: false,
            errormessage: '',
            firstname: '',
            lastname: '',
            scholarnumber: '',
            buffer: null,
            ipfsHash: '',
            active: true,
            curtime : new Date().toLocaleString()
        }
        this.captureFile = this.captureFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.generate = this.generate.bind(this);
    }

    onSubmit = async(event) => {
        event.preventDefault();
        console.log(this.props.address)
        const upload = Submission(this.props.address)
        this.setState({loading:true, errormessage: ''});
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            await upload.methods.submit(this.state.firstname, this.state.lastname, this.state.scholarnumber, this.state.ipfsHash, this.state.curtime).send({
                from: accounts[0]
            });
        } catch (error) {
            this.setState({errormessage: error.Message});
        }
        this.setState({loading: false});
    }

    generate(event) {
        event.preventDefault();
        ipfs.files.add(this.state.buffer, (err, res) => {
            if(err){
                console.log(err)
                return
            }
            this.setState({ipfsHash: res[0].hash})
            console.log('ipfsHash: ', this.state.ipfsHash);
        })
        this.setState({active: false});
    }

    captureFile(event) {
        event.preventDefault();
        console.log('Capture File...')

        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({buffer: Buffer(reader.result)})
            console.log('buffer ',this.state.buffer);
        }
    }

    render(){
        return(
            <Layout>
                <h3>Upload your file</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>First Name</label>
                        <Input 
                         value = {this.state.firstname}
                         onChange = {event => this.setState({firstname: event.target.value})}
                        />
                        <label>Last Name</label>
                        <Input 
                          value = {this.state.lastname}
                          onChange = {event => this.setState({lastname: event.target.value})}  
                        />
                        <label>Scholar Number</label>
                        <Input 
                          value = {this.state.scholarnumber}
                          onChange = {event => this.setState({scholarnumber: event.target.value})}  
                        />
                        <label>Upload File</label>
                        <Input 
                            type='file'
                            onChange = {this.captureFile}
                        />
                    </Form.Field>
                    <Button secondary loading={this.state.loading} disabled={this.state.active}>Submit</Button> 
                    <Button primary onClick={this.generate}>Generate</Button> 
                </Form>

                <br></br>
                <div>
                    Generated Hash: {this.state.ipfsHash}
                </div>
                
            </Layout>
        )
    }
}

export default Upload;