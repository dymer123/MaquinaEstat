import { setup } from 'xstate';

export const feedbackMachine = setup({
  types: {
    context: {} as {},
    events: {} as
      | { type: 'obtenirCodi' }
      | { type: 'error'}
      | { type: 'testOk' }
      | { type: 'build' }
      | { type: 'deployPre' }
      | { type: 'userTestPre' }
      | { type: 'deployPro' }
      | { type: 'parada' },
  },
}).createMachine({
  id: 'deployPipeline',
  initial: 'parada',
  states: {
    parada: {
      on: {
        obtenirCodi: 'codiObtingut',
      },
    },
    codiObtingut: {
      on: {
        testOk: 'testComplet',
        error : 'parada'
      },
    },
    testComplet: {
      on: {
        build: 'buildFinalitzat',
        error : 'parada'
      },
    },
    buildFinalitzat: {
      on: {
        deployPre: 'preDeploy',
        error : 'parada'
      },
    },
    preDeploy: {
      on: {
        userTestPre: 'preTestComplet',
        error : 'parada'
      },
    },
    preTestComplet: {
      on: {
        deployPro: 'deployFinalitzat',
        error : 'parada'
      },
    },
    deployFinalitzat: {
      on: {
        parada: 'parada',
        error : 'parada'
      },
    },
  },
});