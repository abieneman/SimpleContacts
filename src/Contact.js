import React, { Component } from "react";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.myOptions = [];
        
        this.ok = false;
    }

    state = {
        groupName: "",
        updateToggle: "visibility: hidden",
        newName: this.props.info.name,
        newTwitter: this.props.info.twitter,
        newSnapchat: this.props.info.snapchat,
        newInstagram: this.props.info.instagram
    }

    componentDidMount() {
        // console.log(this.props.test);
        // let option = document.createElement("option");
        // option.text = "All Contacts";
        // //let newObject = {value: "All Contacts", label: "All Contacts" }
        // this.myOptions.push(option);
        // for(let i = 0; i < this.props.test.length; i++) {
        //     //newObject = { value: this.props.test[i], label: this.props.test[i] }
        //     option.text = this.props.test[i];
        //     this.myOptions.push(option);
        // }
        this.mySelector = document.getElementById(`id:${this.props.info.id}`);
        let option = document.createElement("option");
        option.text = "-";
        this.mySelector.add(option);
        this.ok = true;
        this.forceUpdate();
    }

    handleDelete = () => {
        this.props.delete(this.props.info.id);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    add = () => {
        this.props.add(this.mySelector.value, this.props.info.id);
    }
    
    remove = () => {
        this.props.remove(this.props.info.id);
    }

    updateToggle = () => {
        if(this.state.updateToggle == "visibility: hidden") {
            this.setState({updateToggle: "" });
        } else {
            this.setState({updateToggle: "visibility: hidden"})
        }
    }

    updateContact = () => {
        let newInfo = {
            id: this.props.info.id,
            name: this.state.newName,
            twitter: this.state.newTwitter,
            snapchat: this.state.newSnapchat,
            instagram: this.state.newInstagram
        }
        this.props.updateContact(newInfo);
    }



    render() {
        if(this.ok) {
            while(this.mySelector.length > 1) {
                this.mySelector.remove(1);
            }
            for(let i = 0; i < this.props.groups.length; i++) {
                let option = document.createElement("option");
                option.text = this.props.groups[i].groupName;
                this.mySelector.add(option);
            }
        }
        return (
            <div Style="border:1px solid black;">
                name: {this.props.info.name} <br />
                twitter: {this.props.info.twitter} <br />
                snapchat: {this.props.info.snapchat} <br />
                instagram: {this.props.info.instagram} <br />
                <button onClick={this.updateToggle}>Toggle Update</button> <br />
                <div Style={this.state.updateToggle}>
                    name:<input defaultValue={this.props.info.name} onChange={this.handleChange} name="newName"></input>
                    twitter:<input defaultValue={this.props.info.twitter} onChange={this.handleChange} name="newTwitter"></input>
                    snapchat:<input defaultValue={this.props.info.snapchat} onChange={this.handleChange} name="newSnapchat"></input>
                    instagram:<input defaultValue={this.props.info.instagram} onChange={this.handleChange} name="newInstagram"></input>
                    <button onClick={this.updateContact}>Update Contact</button>
                </div>
                <button onClick={this.handleDelete}>delete</button>
                Group: <select id={`id:${this.props.info.id}`} options={this.myOptions} /> <button onClick={this.add}>Add to Group</button>
                <button onClick={this.remove}>Remove from Group</button> <br /> <br />
                
                {/* <input name="groupName" type="text" placeholder="Group Name" defaultValue="" onChange={this.handleChange}></input> */}

            </div>
        );
    }
}

export default Contact;

