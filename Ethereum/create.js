import web3 from './web3';
import Match from './build/Create.json';

const instance = new web3.eth.Contract(JSON.parse(Match.interface),'0xA4389007e6FaA7A7390c0AD2ceA03488457E71aF');


export default instance;