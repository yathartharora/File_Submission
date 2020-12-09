import web3 from './web3';
import Match from './build/Create.json';

const instance = new web3.eth.Contract(JSON.parse(Match.interface),'0xBb4665aa00afD3293B5a13bD1cdA46457623aAA5');


export default instance;