package com.incognito.zmq;

import android.os.AsyncTask;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Log;

import org.zeromq.ZMQ;

public class ZeroMQMessageTask extends AsyncTask<String, Void, String> {
    private static final String TAG = "ZeroMQMessageTask";
    private final Handler uiThreadHandler;
    private final String address;
    private ZMQ.Socket socket;
    private ZMQ.Context context;

    public ZeroMQMessageTask(Handler uiThreadHandler, String address) {
        this.uiThreadHandler = uiThreadHandler;
        this.address = address;
    }


    @Override
    protected String doInBackground(String... params) {

        String data = params != null && params.length > 0 ? params[0] : "";
        if (!TextUtils.isEmpty(data)) {
            Log.d(TAG, "doInBackground --- " + data);
            context = ZMQ.context(1);
            socket = context.socket(ZMQ.REQ);
            Log.d(TAG, "doInBackground 01 --- ");
            socket.connect(address);
            Log.d(TAG, "doInBackground 02 --- ");

            socket.send(data.getBytes(), 0);
            Log.d(TAG, "doInBackground 03 --- ");
            String result = new String(socket.recv(0));
            Log.d(TAG, "doInBackground 04 result --- " + result);

            socket.close();
            context.term();

            return result;
        }
        return "";
    }

    @Override
    protected void onCancelled() {
        super.onCancelled();
        if(socket!=null){
            socket.close();
        }

        if(context!=null){
            context.term();
        }

    }

    @Override
    protected void onPostExecute(String result) {
        Log.d(TAG, "Test --- " + result);
        if (!TextUtils.isEmpty(result)) {
            uiThreadHandler.sendMessage(Util.bundledMessage(uiThreadHandler, result));
        }
    }
}
