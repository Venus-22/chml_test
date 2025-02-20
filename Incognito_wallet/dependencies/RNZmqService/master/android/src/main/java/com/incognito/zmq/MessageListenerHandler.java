package com.incognito.zmq;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

public class MessageListenerHandler extends Handler {
    private final IMessageListener messageListener;
    private final String payloadKey;
 
    public MessageListenerHandler(IMessageListener messageListener, String payloadKey) {
        super(Looper.getMainLooper(),null );
        this.messageListener = messageListener;
        this.payloadKey = payloadKey;
    }
 
    @Override
    public void handleMessage(Message msg) {

        messageListener.messageReceived(msg.getData().getString(payloadKey));

    }
}
