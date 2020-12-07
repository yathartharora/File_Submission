import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class RequestRow extends Component{

    render(){
        const {Row, Cell} = Table;
        return (
            <Row>
                <Cell>{this.props.request.firstname} </Cell>
                <Cell>{this.props.request.lastname}</Cell>
                <Cell>{this.props.request.scholar_number}</Cell>
                <Cell>{this.props.request.ipfshash}</Cell>
            </Row>
            
        );
    }
}


export default RequestRow;