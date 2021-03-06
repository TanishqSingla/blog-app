import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function (Component) {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (!this.props.isAuth) {
        this.context.router.history.push("/");
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  Authenticate.contextType = {
    router: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => {
    return {
      isAuth: state.authUser.isAuth,
    };
  };

  return connect(mapStateToProps)(Authenticate);
}
