import web3 from './web3';
import Submission from './build/Submisison.json';


export default (address) => {
    return new web3.eth.Contract(JSON.parse(Submission.interface),address);
};