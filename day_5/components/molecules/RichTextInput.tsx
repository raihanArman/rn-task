import { RichTextInputProps } from "@/utils/types";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { actions } from 'react-native-pell-rich-editor';
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

const RichTextInput = ({
    content,
    onChange,
    placeholder = "Write something...",
    editorStyle,
    toolbarStyle,
}: RichTextInputProps) => {
    const richTextRef = useRef<RichEditor>(null);
    const initialHTML = useRef(content);

    return (
        <View style={styles.container}>


            <View style={{ minHeight: 200 }}>
                <RichEditor
                    ref={richTextRef}
                    initialContentHTML={initialHTML.current}
                    editorStyle={{
                        backgroundColor: 'transparent',
                        color: '#000',
                        caretColor: '#000',
                        placeholderColor: '#888',
                        contentCSSText: 'body { font-size: 14px; }',
                        ...(editorStyle || {}),
                    }}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{ flex: 1 }} // pakai flex agar mengisi parent View
                />
            </View>

            <RichToolbar
                editor={richTextRef}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    editor: {
        minHeight: 200,
        marginBottom: 10,
    },
    toolbar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 4,
        height: 45,
    },
});

export default RichTextInput;
