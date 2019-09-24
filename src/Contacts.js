import React, { Component } from "react";
import Contact from "./Contact"

class Contacts extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        contacts: [],
        name: "",
        twitter: "",
        snapchat: "",
        instagram: "",
        counter: 0,
        display: "",
        groupName: "",
        groups: [],
    }

    componentDidMount() {
        this.mySelector = document.getElementById("selector");
        let option = document.createElement("option");
        option.text = "All Contacts";
        this.mySelector.add(option);
    }


    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    createContact = () => {
        let newContact = { 
            name: this.state.name,
            twitter: this.state.twitter,
            snapchat: this.state.snapchat,
            instagram: this.state.instagram,
            id: this.state.counter++
        }
        this.state.contacts.push(newContact);
        this.displayContacts();
    }

    deleteContact = (id) => {
        let tempId = -1;
        let i = 0;
        while(id != tempId) {
             tempId = this.state.contacts[i].id;
             i++;
        }
        i--;
        this.state.contacts.splice(i, 1);
        let deleteGroups = this.state.groups.filter(group => group.members.indexOf(id) != -1);
        for(let i = 0; i < deleteGroups.length; i++) {
            deleteGroups[i].members.splice(deleteGroups[i].members.indexOf(id), 1);
        }
        this.displayContacts();
    }

    displayContacts = () => {
        let allGroups = [];
        for(let i = 0; i < this.state.groups.length; i++) {
            allGroups.push(this.state.groups[i].groupName);
        }
        this.setState({display: []});
        let temp;
        let myGroup;
        if(this.mySelector.value == "All Contacts") {
            temp = this.state.contacts.map(data => <Contact groups={this.state.groups} selectId={this.state.counter2++} info={data} updateContact={this.updateContact} delete={this.deleteContact} add={this.addToGroup} remove={this.removeFromGroup} />)
        } else {
            myGroup = this.state.groups.find(group => group.groupName == this.mySelector.value)
            let temp3 = [];
            for(let i = 0; i < myGroup.members.length; i++) {
                let temp2 = this.state.contacts.find(contact => contact.id == myGroup.members[i])
                temp3.push(temp2);
            }
            temp = temp3.map(data => <Contact groups={this.state.groups} test2={this.state.test2} test={this.state.test} info={data} updateContact={this.updateContact} delete={this.deleteContact} add={this.addToGroup} remove={this.removeFromGroup}/>)
        }
        this.setState({ display: temp});
    }

    hideContacts = () => {
        this.setState({display: []});
    }

    createGroup = () => {
        if(this.state.groupName == "") {
            alert("invalid group name");
        } else {
            let duplicate = false;
            for(let i = 0; i < this.state.groups.length; i++) {
                if(this.state.groups[i].groupName == this.state.groupName) {
                    duplicate = true;
                    alert("group name in use");
                }
            }

            if(!duplicate) {
                let newGroup = {
                    groupName: this.state.groupName,
                    members: []
                }
                this.state.groups.push(newGroup);
                let option = document.createElement("option");
                option.text = newGroup.groupName;
                this.mySelector.add(option);
            }
            this.displayContacts();
        }
    }

    updateContact = (newInfo) => {
        let myContact = this.state.contacts.find(contact => contact.id == newInfo.id);
        myContact.name = newInfo.name;
        myContact.twitter = newInfo.twitter;
        myContact.snapchat = newInfo.snapchat;
        myContact.instagram = newInfo.instagram;
        this.displayContacts();
    }
    
    deleteGroup = () => {
        let name = this.mySelector.value;
        let found = false;
        let j = 0;
        while( (j < this.state.groups.length) && (!found) ) {
            if(name == this.state.groups[j].groupName) {
                this.state.groups.splice(j, 1);
                found = true;
            }
            j++;
        }
        if(found) {
            while(this.mySelector.length > 1) {
                this.mySelector.remove(1);
            }
            for(let i = 0; i < this.state.groups.length; i++) {
                let option = document.createElement("option");
                option.text = this.state.groups[i].groupName;
                this.mySelector.add(option);
            }
        }
        this.displayContacts();
    }

    addToGroup = (groupName, id) => {
        if(groupName == "") {
            alert("Please enter a group name");
        } else {
            let found = false;
            let i = 0;
            while( (i < this.state.groups.length) && (!found) ) {
                if(this.state.groups[i].groupName == groupName) {
                    found = true;
                }
                i++;
            }
            if(found) {
                i--;
                if(this.state.groups[i].members.indexOf(id) == -1) {
                    this.state.groups[i].members.push(id)
                } else {
                    alert("already a member");
                }
            } else {
                alert("cannot find group");
            }
        }
    }

    removeFromGroup = (id) => {
        if(this.mySelector.value == "All Contacts") {
            alert("cannot remove from All Contacts, try delete instead");
        } else {
            let myGroup = this.state.groups.find(group => group.groupName == this.mySelector.value);
            myGroup.members.splice(myGroup.members.indexOf(id), 1);
            this.displayContacts();
        }
    }

    render() {
        return (
            <div>
                Contact:<input name="name" type="text" placeholder="Contact Name" onChange={this.handleChange}></input>
                twitter:<input name="twitter" type="text" placeholder="Contact's Twitter" onChange={this.handleChange}></input>
                snapchat:<input name="snapchat" type="text" placeholder="Contact's SnapChat" onChange={this.handleChange}></input>
                instagram:<input name="instagram" type="text" placeholder="Contact's Instagram" onChange={this.handleChange}></input>
                <button onClick={this.createContact}>Create Contact</button> <br />
                Group:<input name="groupName" type="text" placeholder="Group Name" onChange={this.handleChange}></input>
                <button onClick={this.createGroup}>Create Group</button> <br />
                <select Id="selector" onChange={this.displayContacts}/>
                <button onClick={this.deleteGroup}>Delete Group</button>
                {this.state.display}
            </div>
        );
    }
}

export default Contacts;

