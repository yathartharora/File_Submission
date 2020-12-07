import web3 from './web3';
import Match from './build/Create.json';

const instance = new web3.eth.Contract(JSON.parse(Match.interface),'0x6E6ee82Ad4bD5f94920A76abA924C579eD084d6B');


export default instance;