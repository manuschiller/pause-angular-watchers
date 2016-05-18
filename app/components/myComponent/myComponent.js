/**
 * Created by manu on 06.04.16.
 */


angular.module("app")
    .value("WpTable",React.createClass( {
        propTypes : {
            table: React.PropTypes.object.isRequired
        },

        getDefaultProps: function() {
            return { table: { rows: [], cols: [] } };
        },

        /**
         * @desc
         * This could be simplyfied dramatically by using JSX Templates and a preprocessor (eg babel)
         * in the build process
         * see http://facebook.github.io/react/docs/getting-started.html#offline-transform
         *
         * The template would look like this:
         * var wpTableComponent = React.createClass( {
         * propTypes: {
         *   fname: React.PropTypes.string.isRequired,
         *   lname: React.PropTypes.string.isRequired
         * },
         * render: function() {
         * return (<table>
         *
         * </table>);
         * }
         * } );
         *

         * @returns {*}
         */
        render: function() {


            var cols = this.props.table.cols.map( function( col, i ) {
                return React.DOM.th( { key: i }, col );
            } );
            var header = React.DOM.thead( null, React.DOM.tr( {key:'header'}, cols ) );

            var body = React.DOM.tbody( null, this.props.table.rows.map( function( row, i ) {
                return React.DOM.tr( { key: i }, row.map( function( cell, j ) {
                    return React.DOM.td( { key: j }, cell );
                } ) );
            } ) );

            return React.DOM.table( {key:'table'}, [header, body] );
        }
    }));

angular.module("app")
    .directive( 'wpTable', function(reactDirective){
        return reactDirective( 'WpTable');
    });

