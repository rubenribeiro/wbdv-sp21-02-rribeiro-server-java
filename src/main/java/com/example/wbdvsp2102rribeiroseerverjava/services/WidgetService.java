package com.example.wbdvsp2102rribeiroseerverjava.services;

import java.util.List;
import com.example.wbdvsp2102rribeiroseerverjava.models.Widget;
import com.example.wbdvsp2102rribeiroseerverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public List<Widget> findAllWidgets() {
        return  repository.findAllWidgets();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
          return repository.findWidgetsForTopic(topicId);
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        int index = -1;
        Widget originalWidget = repository.findById(id).get();
        originalWidget.setText(widget.getText());
        repository.save(originalWidget);

        return 1;
    }
}
