import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Application/Application';
import Application from './components/Application/Application';
import Loading from './components/Loading/Loading';
import Toast from './components/Toast/Toast';
import UserProvider from './components/UserProvider/UserProvider';

function App() {
	return (
		<div className="App">
			<Toast>
				<UserProvider>
					<Loading>
						<Application />
					</Loading>
				</UserProvider>
			</Toast>
		</div>
	);
}

export default App;
