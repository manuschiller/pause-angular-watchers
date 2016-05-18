window.myComponent = React.createClass( {

    propTypes : {
        table: React.PropTypes.object.isRequired
    },

    getDefaultProps: function() {
        return { table: { rows: [], cols: [] } };
    },

    render: function() {

        return <span>My Name is Manu</span>;
    }
} );