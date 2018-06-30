Search = React.createClass({
  getInitialState() {
    return {
      searchingText: ''
    }
  },

  handleChange: function(event){
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });
    if (searchingText > 2){
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function(event){
    if (event.keyCode === 13){
      this.props.onKeyUp(this.state.searchingText);
    }
  },

  render: function(){
    var styles = {
      fontSize = '1.5em',
      width: '90%',
      maxWidth: '350px'
    };

    return <input type='text' onChange={this.handleChange} onKeyUp={this.handleKeyUp} placeholder='Tu wpisz wyszukiwaną frazę' style={styles} value={this.state.searchTerm} />
  }
});