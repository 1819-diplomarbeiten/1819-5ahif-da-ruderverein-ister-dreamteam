package entities;

public class Message {
    private String msg;
    private String value;

    public Message(String msg, String value){
        this.msg = msg;
        this.value = value;
    }

    //region Getter Setter
    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    //endregion
}
