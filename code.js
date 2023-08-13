"use strict";

import JavaScript from "./source/languages/JavaScript.js";

export default class Code extends HTMLElement{
  //// Native Form Behaviour
  // Identify the element as a form-associated custom element
  static formAssociated = true;

  static #template = document.createElement("template");

  static {
    Code.#template.innerHTML = `
      <pre>
        <code>
        </code>
      </pre>
    `;
  }

  constructor(){
    super();

    this.shadow = this.attachShadow({mode: 'closed'});
    this.RAW = this.textContent;

    // If language is not defined, then exit
    if(!!this.hasAttribute("lang") === false) return;

    CSS: {
        const style = document.createElement('style');
        style.textContent = `
          pre{
            background-color: hsla(230, 13%, 9%, 1);
            width: 100%;
            height: auto;
            border-radius: 5px;
            box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.5);

            & > code{
              color: white;
              width: 100%;
              height: 100%;
              padding: 5px;
              line-height: 150%;

            }
          }
        `;
        this.shadow.appendChild(style);
    }

    // Clone And Append Template
    this.shadow.appendChild(Code.#template.content.cloneNode(true));

    this.codeElement = this.shadow.querySelector("pre > code");

    switch(this.lang){
      case "JavaScript":
        this.codeElement.innerHTML = JavaScript.handle(this.RAW);
        break;
      case "HTML":
        this.codeElement.innerHTML = this.RAW;
        break;
      default:
        console.log("No match");
    }
  }

};

window.customElements.define('x-code', Code);

// Make Code Usable W/O Importing It
window.Code = Code;
