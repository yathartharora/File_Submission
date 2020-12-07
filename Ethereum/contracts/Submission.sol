pragma solidity 0.4.25;
pragma experimental ABIEncoderV2;



contract Create{
    
    struct Subject{
        string name;
        address sender;
    }
    
    Subject[] public subjects;
    
    function createNewSubject(string subject_name) public{
        Subject memory newSubject = Subject({
            name: subject_name,
            sender: new Submission(msg.sender)
        });
        
        subjects.push(newSubject);
    }
    
    function getDeployedContracts() public view returns(Subject[]){
        return subjects;
    }
}

contract Submission{
    
    
    struct Submit{
        string firstname;
        string lastname;
        string scholar_number;
        string ipfshash;
    }
    
    address public manager;
    mapping (address => Submit) public submission;
    mapping (address => bool) public submitted;
    Submit[] public listofsubmissions;
    
    
    constructor(address sender) public{
        manager= sender;
    }
    
    function submit(string first_name, string last_name, string scholar_number, string ipfshash) public {
        
        Submit storage newSubmission = submission[msg.sender];
        
        newSubmission.firstname = first_name;
        newSubmission.lastname = last_name;
        newSubmission.scholar_number = scholar_number;
        newSubmission.ipfshash = ipfshash;
        
        require(!submitted[msg.sender]);
        submitted[msg.sender] = true;
        
        listofsubmissions.push(newSubmission);
    }
    
    function display() public view returns(Submit[]){
        return listofsubmissions;
    }
    
}