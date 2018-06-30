App = React.createClass({
	getInitialState() {
		// ustawienie stanu:
		// loading false - nic nie ładujemy
		// searchingText - nic nie pobraliśmy z komponentu search
		// gif - w związku z tym git to pusty obiekt
		return {
			loading: false,
			searchingText: '',
			gif: {}
		}
	},
	
	handleSearch: function(searchingText) {
		// obsługuje komunikację z inputem w komponencie search
		// stan na true bo jak uruchomiliśmy funkcję, to wiadomo, że coś pobieramy
		this.setState({
			loading: true
		});
		// na podstawie textu pobranego z inputa 
		this.getGif(searchingText, function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this));
	},

	getGif: function(searchingText, callback) {
		var GIPHY_PUB_KEY = 'qYJUoExqhocza5OQXzJpzFgXT2AxuaGW';
    var GIPHY_API_URL = 'https://api.giphy.com';
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; 
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);

		xhr.onload = function() {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data; 
				var gif = { 
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
			// po co ten callback? Czy to jest odwołanie do funkcji z 21 linijki? Czy chodzi o to, że w ten sposób przekazujemy info to setState ?
			callback(gif); 
			}
		};
    xhr.send();
	},

	render: function() {

		var styles = {
			margin: '0 auto',
			textAligin: 'center',
			width: '90%'
		};

		return (
			<div style={styles}>
				<h1>Wyszukiwarka GIFów</h1>
				<p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch}/>
				<Gif 
				loading={this.state.loading}
				url={this.state.gif.url}
				sourceUrl={this.state.gif.sourceUrl}
				/>
			</div>
		);
	}
});