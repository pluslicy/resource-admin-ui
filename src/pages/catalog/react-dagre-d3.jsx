import React from 'react';
import PropTypes from 'prop-types';
import * as dagreD3 from 'dagre-d3';
import * as d3 from 'd3';
 
class DagreD3 extends React.Component {
  static defaultProps = {
    width: '500px',
    height: '500px',
    nodes: {},
    edges: [],
    graph: {},
    interactive: false,
    onNodeClick: (id) => {console.log(id)}
  }
 
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    nodes: PropTypes.object,
    edges: PropTypes.array,
    graph: PropTypes.object,
    interactive: PropTypes.bool,
    onNodeClick: PropTypes.func,
    onNodeHover: PropTypes.func
  }
 
  componentDidMount() {
    this.renderDag();
  }
 
  shouldComponentUpdate(nextProps) {
    return !(this.props.nodes === nextProps.nodes)
      || !(this.props.edges === nextProps.edges);
  }
 
  componentDidUpdate() {
    this.renderDag();
  }
 
  setNodeTree = (nodeTree) => {
    this.nodeTree = nodeTree;
  }
 
  setNodeTreeInner = (nodeTreeInner) => {
    this.nodeTreeInner = nodeTreeInner;
  }
 
  renderDag() {
    var svgCanvas = document.getElementById('svg-canvas'); //svg
    var myMenu = document.getElementById("myMenu"); //右键菜单
   
    svgCanvas.addEventListener('mousedown', function (e) {//监听鼠标右键
      e.preventDefault();
      console.log(e.target.tagName)
      if (e.target.tagName === 'rect') {
            myMenu.style.top = event.clientY + "px"; //获取鼠标位置
            myMenu.style.left = event.clientX + "px";
            myMenu.style.display = 'block';      //显示相应右键内容
      }
    })
    document.addEventListener("click", (event) => {
        console.log('1');
        myMenu.style.display = '';
    });
 
    const { nodes, edges, interactive, fit, onNodeClick, graph } = this.props;
    const g = new dagreD3.graphlib.Graph()
      .setGraph({ ...graph }) // Set an object for the graph label
      .setDefaultNodeLabel(() => ({}))
      .setDefaultEdgeLabel(() => ({})); // Default to assigning a new object as a label for each new edge.
    Object.keys(nodes).forEach((id) => {
      g.setNode(id, nodes[id]);
    });
    edges.forEach((edge) => {
      edge[2] ? g.setEdge(edge[0], edge[1], edge[2]) : g.setEdge(edge[0], edge[1]);
    });
 
    const svg = d3.select(this.nodeTree);
    const inner = d3.select(this.nodeTreeInner);
    if (interactive) { // 自适应缩放
      const zoom = d3.zoom().on('zoom', () => inner.attr('transform', d3.event.transform));
      svg.call(zoom);
    }
    const render = new dagreD3.render(); // eslint-disable-line
 
    render(inner, g);
 
 
    render(inner, g);
 
    // 自适应宽高
    if (fit) {
      const { height: gHeight, width: gWidth } = g.graph();
      const { height, width } = this.nodeTree.getBBox();
      const transX = width - gWidth;
      const transY = height - gHeight;
      svg.attr('viewBox', `0 0 ${width} ${height}`);
      inner.attr('transform', d3.zoomIdentity.translate(transX, transY));
    }
 
    if (onNodeClick) { // 点击事件
      svg.selectAll('g.node').on('click',
        id => onNodeClick(id));
    }
  }
 
  render() {
    const { width, height } = this.props;
    return (
      <div style={{flex:'1'}} >
        <svg id="svg-canvas" ref={this.setNodeTree}>
            <g  ref={this.setNodeTreeInner} />
        </svg>
        <div id="myMenu">aaaa</div>
      </div>  
    );
  }
}
 
export { d3 };
 
export default DagreD3;