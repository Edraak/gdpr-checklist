import React from 'react'
import Link from 'gatsby-link'
import Sidebar from '../components/Sidebar'
import Newsletter from '../components/Newsletter'
// import Footer from '../components/Footer'
import { steps } from '../data.js'
import meta from '../shared/meta.js'
import Arrow from '../images/arrow-bottom.svg'

class Li extends React.Component {
  constructor() {
    super()
    this.state = {
      isChecked: false,
      isExpended: false,
    }
  }

  handleExpend = () => {
    this.setState(prevState => ({
      ...prevState,
      isExpended: !prevState.isExpended
    }))
  }

  handleToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      isChecked: !prevState.isChecked
    }))
  }

  render () {
    return (
      <li className={`seed ${this.state.isExpended ? 'expend' : ''}`}>
        <div className="header">
          <div className={`check ${this.state.isChecked ? 'checked' : ''}`} onClick={this.handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <g fill="none" fillRule="evenodd" strokeWidth="3" transform="translate(2 2)">
                <path stroke="#057ee6" d="M6 11.402l2.874 2.934L16.06 7"></path>
                <circle cx="11" cy="11" r="11"></circle>
              </g>
            </svg>
          </div>
          <div className={`expend-bar ${this.state.isChecked ? 'checked' : ''}`} onClick={this.handleExpend}>
            <p>{this.props.title}</p>
           
                 {this.props.role.map(function(role, index){
                     
                     return <span className="category" key={ index }>{role}</span>;
                  })}
           
          </div>
          <div className="btn">
            <img src={Arrow} alt="" className="arrow" onClick={this.handleExpend} />
          </div>
        </div>
        <div className='body' style={{ display: this.state.isExpended ? 'block' : 'none' }} >
          <p>{this.props.description}<br/><br/>Read more:</p>
          <ul>
            {this.props.links.map(l => <li><a href={l} target="_blank">{l}</a></li>)}
          </ul>
        </div>
      </li>
    )
  }
}

class Section extends React.Component {
    
  render () {
    return (
        
        <div>
        {
        
        this.props.list.map(function(item, index){
            
            var filtered_list = [];
            item.items.map( function(l, index)
                          {
                            if( ( this.props.controllerSelected  && l.role.includes('controller')  ) ||
                                    ( this.props.processorSelected  && l.role.includes('processor')  )  )
                            
                            {
                                filtered_list.push( l );
                            }
                            
                          }.bind(this)
              )
                      
             if( filtered_list.length == 0)
             {
                return ;
             }
             return   <div className="scrollspy" id={[item.id]}>
                    <h2>{item.title}</h2>
                    <ul className="checklist">
                      { filtered_list.map( function(l, index)
                          {
                            if( ( this.props.controllerSelected  && l.role.includes('controller')  ) ||
                                    ( this.props.processorSelected  && l.role.includes('processor')  )  )
                            
                            {
                                return <Li {...l} top={index * 70} />
                            }
                            
                          }.bind(this)
                      )}
                    </ul>
                  </div>
                  
          }.bind(this) )}
        
        </div>
    )
  }

}

class IndexPage extends React.Component {
    
  constructor() {
    super()
    this.state = {
      processorSelected: true,
      controllerSelected: true
    }
  }
  toggleController = () => {
     this.setState({ controllerSelected : !this.state.controllerSelected } );
  }
  
  toggleProcessor = () => {
     this.setState({ processorSelected : !this.state.processorSelected } );
  }
  
  render () {
    return (
      <div>
        <div className='wrapper'>
          <div className='columns'>
            <Sidebar />
            <div className="col-9">
              <h1>The GDPR Checklist</h1>
              <p className="description">Achieving GDPR Compliance shouldn't feel like a struggle. 
              This is a basic checklist you can use to harden your GDPR compliancy. Select if you are a data processor 
              (explain) or data controllor (explain) and use the checkpoints to improve your compliancy. 
              This list is far from a legal exhaustive document, it merely tries to help you overcome the struggle.
              <br/><br/>Feel free to <a href="https://github.com/GDPRTracker/checklist" target="_blank">contribute directly</a> on GitHub!</p>
              <div className="filter-bar">
                <h3>ROLE</h3>
                <ul className="selected-three">
                  <li onClick={this.toggleController} className={this.state.controllerSelected ? 'is-active' : ''}>Data Controller</li>
                  <li onClick={this.toggleProcessor} className={this.state.processorSelected ? 'is-active' : ''}>Data Processor</li>
                </ul>
              </div>
                { steps.map( (function(s)
                    {
                    return <Section list={[s]} controllerSelected={this.state.controllerSelected} processorSelected={this.state.processorSelected} /> 
                    }).bind(this)
                    ) }
              <Newsletter />
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
  )}
}

export default IndexPage
