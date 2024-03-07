import {EventTarget} from 'event-target-shim';
global.EventTarget = EventTarget;
global.event = require('react-native/Libraries/Events/EventPolyfill').default;
