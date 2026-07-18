package team.foxbridge.animatednumber;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.PluginContext;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

@Component
public class AnimatedNumberHeadProcessor implements TemplateHeadProcessor {
    private final PluginContext pluginContext;

    public AnimatedNumberHeadProcessor(PluginContext pluginContext) {
        this.pluginContext = pluginContext;
    }

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        var factory = context.getModelFactory();
        var version = pluginContext.getVersion();
        var css = readAsset("static/animated-number.css");
        var javascript = readAsset("static/animated-number.js");
        model.add(factory.createText("""
            <!-- plugin-animated-number start -->
            <style data-animated-number-version="%s">%s</style>
            <script data-animated-number-version="%s">%s</script>
            <!-- plugin-animated-number end -->
            """.formatted(version, css, version, javascript)));
        return Mono.empty();
    }

    private static String readAsset(String path) {
        try {
            return new ClassPathResource(path, AnimatedNumberHeadProcessor.class.getClassLoader())
                .getContentAsString(StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("Unable to load animated-number asset: " + path, e);
        }
    }
}
