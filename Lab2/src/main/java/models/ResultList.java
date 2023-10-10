package models;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ResultList implements Iterable<Result>{

    private List<Result> resultList;

    public ResultList() {
        this.resultList = new ArrayList<>();
    }

    public void add(Result result) {
        this.resultList.add(result);
    }

    @Override
    public Iterator<Result> iterator() {
        return resultList.listIterator();
    }

    public int size() {
        return resultList.size();
    }
}
