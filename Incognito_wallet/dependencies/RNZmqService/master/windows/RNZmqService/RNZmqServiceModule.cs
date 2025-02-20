using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Zmq.Service.RNZmqService
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNZmqServiceModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNZmqServiceModule"/>.
        /// </summary>
        internal RNZmqServiceModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNZmqService";
            }
        }
    }
}
