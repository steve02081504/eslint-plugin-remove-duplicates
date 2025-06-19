export default {
	rules: {
		'remove-array-duplicates': {
			meta: {
				type: 'problem',
				docs: {
					description: 'Remove duplicate strings in specially marked arrays.',
					category: 'Best Practices',
					recommended: false,
				},
				fixable: 'code',
				schema: [],
			},
			create (context) {
				const sourceCode = context.getSourceCode()
				return {
					ArrayExpression(node) {
						// The comment might be attached to the array itself, its parent (VariableDeclarator),
						// or its grandparent (VariableDeclaration). We check all of them to be safe.
						const comments = [
							...sourceCode.getCommentsBefore(node),
							...node.parent ? sourceCode.getCommentsBefore(node.parent) : [],
							...node.parent && node.parent.parent ? sourceCode.getCommentsBefore(node.parent.parent) : [],
						]

						const hasMarker = comments.some(
							(comment) => comment.value.trim() === '@remove-duplicates'
						)

						if (!hasMarker)
							return

						const seen = new Set()
						for (const element of node.elements) {
							if (element === null)
								continue // Skip empty slots like in [1, , 2]

							const elementText = sourceCode.getText(element)

							if (seen.has(elementText))
								context.report({
									node: element,
									message: `Duplicate value ${elementText} found.`,
									fix(fixer) {
										const tokenAfter = sourceCode.getTokenAfter(element)
										if (tokenAfter && tokenAfter.value === ',')
											return fixer.removeRange([element.range[0], tokenAfter.range[1]])

										return fixer.remove(element)
									},
								})
							 else
								seen.add(elementText)
						}
					},
				}
			},
		}
	}
}
