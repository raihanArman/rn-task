import { decode } from 'html-entities';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { colors } from '@/constants/theme';
import { HtmlTextProps } from '@/utils/types';

const HtmlText = ({ html, baseStyle }: HtmlTextProps) => {
    const { width } = useWindowDimensions();

    return (
        <RenderHtml
            contentWidth={width}
            source={{ html: decode(html) }}
            tagsStyles={{
                b: { fontWeight: 'bold' },
                strong: { fontWeight: 'bold' },
                i: { fontStyle: 'italic' },
                em: { fontStyle: 'italic' },
            }}
            baseStyle={{
                color: colors.neutral500,
                ...baseStyle,
            }}
        />
    );
};

export default HtmlText
