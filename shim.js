// shim.js
import { Buffer } from '@craftzdog/react-native-buffer';

global.Buffer = Buffer;
global.process = require('process');
