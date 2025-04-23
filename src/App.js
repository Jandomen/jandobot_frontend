import Chatbox from "./components/Chatbox";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <main className="flex-grow">
        <Chatbox />
      </main>
      <Footer />
    </div>
  );
}

export default App;
