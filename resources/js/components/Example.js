import React from 'react';
import ReactDOM from 'react-dom';
import TransferForm from './TransferForm'
import TransferList from './TransferList'
import url from './url'
class Example extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            money:0.0,
            transfers:[],
            error: null,
            form: {
                description:'',
                amount:'',
                wallet_id: 1
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e){
        e.preventDefault()
        try {
            let formData = new FormData();
            formData.append('description',this.state.form.description)
            formData.append('amount',this.state.form.amount)
            formData.append('wallet_id',this.state.form.wallet_id)
            let config ={
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'ContentType':'application/json'
                },
                body:formData
            }
            
            let res = await fetch(`${url}/api/transfer`,config)
            let data = await res.json();
            this.setState({
                transfers: this.state.transfers.concat(data),
                money:this.state.money + (parseInt(data.amount))
            })
        } catch (error) {
            this.setState({
                error
            })
        }
        
    }
    handleChange(e){
        this.setState({
            form:{ 
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    async componentDidMount(){
        try {
            let res = await fetch(`${url}/api/wallet`)
            let data = await res.json();
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }
    render(){
        return (
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-12-m-t-md">
                        <p className="title"> $ {this.state.money} </p>
                    </div>
                    <div className="col-md-12">
                        <TransferForm
                            form={this.state.form}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
                <div className="m-t-md">
                    <TransferList
                        transfers= {this.state.transfers}
                    />
                </div>
            </div>
        );
    }
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
