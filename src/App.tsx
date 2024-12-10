import './App.css';
import { feedbackMachine } from './feedbackMachine';
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import git from './img/git.png'; 
import off from './img/off.png'; 

const { inspect } = createBrowserInspector({
  autoStart: false,
});

function Feedback() {
  const [state, send] = useMachine(feedbackMachine, {
    inspect,
  });

  return (
    <div className="feedback">
      {state.matches('parada') && (
        <div className="step">
          <h2>Parada</h2>
          <img src={off} alt="Parada" width={250} />
          <button
            className="button"
            onClick={() => send({ type: 'obtenirCodi' })}
          >
          Event git
          </button>
        </div>
      )}

      {state.matches('codiObtingut') && (
        <div className="step">
          <h2>Obtenir Codi</h2>
          <img src={git} alt="Parada" width={250} />
          <button
            className="button"
            onClick={() => send({ type: 'testOk' })}
          >
            Codi obtingut
          </button>
          <button
            className="button"
            onClick={() => send({ type: 'error' })}
          >
            Error
          </button>
        </div>
      )}

      {state.matches('testComplet') && (
        <div className="step">
          <h2>Build</h2>
          <button
            className="button"
            onClick={() => send({ type: 'build' })}
          >
            Build finish
          </button>
        </div>
      )}

      {state.matches('buildFinalitzat') && (
        <div className="step">
          <h2>DeployPre</h2>
          <button
            className="button"
            onClick={() => send({ type: 'deployPre' })}
          >
            Anar al servidor
          </button>
        </div>
      )}

      {state.matches('preDeploy') && (
        <div className="step">
          <h2>User Test</h2>
          <button
            className="button"
            onClick={() => send({ type: 'userTestPre' })}
          >
            User test ok
          </button>
        </div>
      )}

      {state.matches('preTestComplet') && (
        <div className="step">
          <h2>Deploy Pro</h2>
          <button
            className="button"
            onClick={() => send({ type: 'deployPro' })}
          >
            Deploy Done
          </button>
        </div>
      )}

      {state.matches('deployFinalitzat') && (
        <div className="step">
          <h2>Done</h2>
          <button
            className="button"
            onClick={() => send({ type: 'parada' })}
          >
            Parar
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return <Feedback />;
}

export default App;