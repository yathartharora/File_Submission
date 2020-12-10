import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class RequestRow extends Component{

    render(){
        const {Row, Cell} = Table;
        return (
            <Row>
                <Cell>{this.props.id + 1} </Cell>
                <Cell>{this.props.request.firstname} </Cell>
                <Cell>{this.props.request.lastname}</Cell>
                <Cell>{this.props.request.scholar_number}</Cell>
                <Cell><a href={`https://ipfs.io/ipfs/${this.props.request.ipfshash}`}>Click Here</a></Cell>
                <Cell>{this.props.request.time} </Cell>
            </Row>
            
        );
    }
}


export default RequestRow;