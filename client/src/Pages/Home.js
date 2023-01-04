import MainApp from './MainApp';
import toasty from 'toasty';
import useKonami from 'use-konami';

const Home = () => {
  useKonami({onUnlock: () => toasty().trigger()});
  return (
    <div>
      <h1>Home</h1>
      <MainApp />
    </div>
  );
}

export default Home;