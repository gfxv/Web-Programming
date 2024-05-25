package dev.gfxv;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.context.SessionScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import lombok.NoArgsConstructor;

import javax.management.*;
import java.lang.management.ManagementFactory;

@NoArgsConstructor
public class Agent {

    @Inject
    private BeanOfCum cum;
    @Inject
    private StatBean stat;
    @Inject
    private TableBean table;

    @PostConstruct
    public void initAgent() {
        MBeanServer mBeanServer = ManagementFactory.getPlatformMBeanServer();
        ObjectName beanOfCumObject;
        ObjectName statBeanObject;

        try {
            beanOfCumObject = new ObjectName("dev.gfxv:type=Agent,name=mBeanOfCumObject");
            statBeanObject = new ObjectName("dev.gfxv:type=Agent,name=statMBeanObject");

            mBeanServer.registerMBean(cum, beanOfCumObject);
            mBeanServer.registerMBean(stat, statBeanObject);

        } catch (MalformedObjectNameException |
                 NotCompliantMBeanException |
                 InstanceAlreadyExistsException |
                 MBeanRegistrationException e
        ) {
            System.out.println("[!] well... something happened");
            System.out.println(e.getMessage());
        }
    }

    public void logAgent() {
        System.out.println("SimpleAgent.logSimpleAgentStarted");
    }

    public void startup(@Observes @Initialized(SessionScoped.class) Object context) {
        Agent a = new Agent();
        a.logAgent();
    }

}
