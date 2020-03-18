import React from 'react';
import { Grid, GridRow, GridCell } from '..';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import './layout-grid.stories.css';

export default { title: 'LayoutGrid' };

export const Basic = () => (
  <Grid className="grid grid--basic">
    <GridRow>
      <GridCell className="grid-cell"></GridCell>
      <GridCell className="grid-cell"></GridCell>
      <GridCell className="grid-cell"></GridCell>
    </GridRow>
  </Grid>
);

export const Columns = () => (
  <Grid className="grid">
    <GridRow>
      <GridCell className="grid-cell" span={6}></GridCell>
      <GridCell className="grid-cell" span={3}></GridCell>
      <GridCell className="grid-cell" span={2}></GridCell>
      <GridCell className="grid-cell" span={1}></GridCell>
      <GridCell className="grid-cell" span={3}></GridCell>
      <GridCell className="grid-cell" span={1}></GridCell>
      <GridCell className="grid-cell" span={8}></GridCell>
    </GridRow>
  </Grid>
);

export const Alignment = () => (
  <>
    <div>Left Alignment</div>
    <Grid className="grid grid--alignment" align="left">
      <GridRow>
        <GridCell className="grid-cell"></GridCell>
        <GridCell className="grid-cell"></GridCell>
        <GridCell className="grid-cell"></GridCell>
      </GridRow>
    </Grid>
    <br />
    <br />
    <div>Right Alignment</div>
    <Grid className="grid grid--alignment" align="right">
      <GridRow>
        <GridCell className="grid-cell"></GridCell>
        <GridCell className="grid-cell"></GridCell>
        <GridCell className="grid-cell"></GridCell>
      </GridRow>
    </Grid>
  </>
);

export const CellAlignment = () => (
  <Grid className="grid grid--cell-alignment">
    <GridRow className="grid-inner">
      <GridCell
        className="grid-cell grid-cell--alignment"
        align="top"
      ></GridCell>
      <GridCell
        className="grid-cell grid-cell--alignment"
        align="middle"
      ></GridCell>
      <GridCell
        className="grid-cell grid-cell--alignment"
        align="bottom"
      ></GridCell>
    </GridRow>
  </Grid>
);
