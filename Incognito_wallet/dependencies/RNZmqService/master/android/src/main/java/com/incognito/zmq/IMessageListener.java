package com.incognito.zmq;

public interface IMessageListener {
	void messageReceived(String messageBody);
}
