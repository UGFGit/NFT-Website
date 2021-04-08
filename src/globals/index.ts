import {copyTextToClipboard} from './dom';

export default (window: Window) => {
    let globals = {} as any;

    globals.dom = {
        copyTextToClipboard
    };
    //@ts-ignore
    window.globals = globals;
}
