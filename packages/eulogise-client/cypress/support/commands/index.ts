import '@testing-library/cypress/add-commands'
import { CypressHelper } from '../helpers/CypressHelper'
import Find from './find'
import Assertions from './assertions'
import { LoginFeature } from './features/login'

CypressHelper.addCommands(Find)
CypressHelper.addCommands(Assertions)
CypressHelper.addCommands(LoginFeature)
