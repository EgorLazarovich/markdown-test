import * as React from 'react';
import MarkdownEditor from '../markdownEditor/MarkdownEditor';

const styles = require('./App.css');

export default class App extends React.Component {
  public render():JSX.Element
  {
    return (
      <div className={styles.base}>
          <div className={styles.editorContainer}>
            <MarkdownEditor/>
          </div>
      </div>
    );
  }
}
